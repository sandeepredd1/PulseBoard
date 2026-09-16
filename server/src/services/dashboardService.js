const Project = require("../models/Project");

const getDashboardSummary = async (userId, selectedYear) => {
  const [
    projectStats,
    statusStats,
    recentProjects,
    activityStats,
    availableYears,
  ] = await Promise.all([
    Project.aggregate([
      {
        $match: {
          owner: userId,
        },
      },
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          activeProjects: {
            $sum: {
              $cond: [
                { $in: ["$status", ["todo", "in_progress"]] },
                1,
                0,
              ],
            },
          },
          completedProjects: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          overdueProjects: {
            $sum: {
              $cond: [{ $eq: ["$status", "overdue"] }, 1, 0],
            },
          },
        },
      },
    ]),

    Project.aggregate([
      {
        $match: {
          owner: userId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),

    Project.find({
      owner: userId,
    })
      .sort({ updatedAt: -1 })
      .limit(5)
      .lean(),

    Project.find({
      owner: userId,
    })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("title status updatedAt createdAt")
      .lean(),

    Project.aggregate([
      {
        $match: {
          owner: userId,
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$year",
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]),
  ]);

  const stats = projectStats[0] || {
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    overdueProjects: 0,
  };

  const statusMap = {
    todo: 0,
    in_progress: 0,
    completed: 0,
    overdue: 0,
  };

  statusStats.forEach((item) => {
    if (statusMap[item._id] !== undefined) {
      statusMap[item._id] = item.count;
    }
  });

  const statusChart = [
    {
      status: "todo",
      label: "To Do",
      count: statusMap.todo,
    },
    {
      status: "in_progress",
      label: "In Progress",
      count: statusMap.in_progress,
    },
    {
      status: "completed",
      label: "Completed",
      count: statusMap.completed,
    },
    {
      status: "overdue",
      label: "Overdue",
      count: statusMap.overdue,
    },
  ];

  const total = stats.totalProjects;

  const progress = {
    todo: total ? Math.round((statusMap.todo / total) * 100) : 0,
    inProgress: total
      ? Math.round((statusMap.in_progress / total) * 100)
      : 0,
    completed: total
      ? Math.round((statusMap.completed / total) * 100)
      : 0,
    overdue: total
      ? Math.round((statusMap.overdue / total) * 100)
      : 0,
  };

  // =========================
  // DYNAMIC YEARS FROM MONGODB
  // =========================

  const years = availableYears.map((item) => Number(item._id));

  const latestYear =
    years.length > 0
      ? years[0]
      : new Date().getFullYear();

  const requestedYear = Number(selectedYear);

  const year =
    requestedYear && years.includes(requestedYear)
      ? requestedYear
      : latestYear;

  // =========================
  // YEAR RANGE
  // =========================

  const startOfYear = new Date(
    `${year}-01-01T00:00:00.000Z`
  );

  const startOfNextYear = new Date(
    `${year + 1}-01-01T00:00:00.000Z`
  );

  // =========================
  // MONTHLY PROJECT DATA
  // =========================

  const monthlyStats = await Project.aggregate([
    {
      $match: {
        owner: userId,
        createdAt: {
          $gte: startOfYear,
          $lt: startOfNextYear,
        },
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
          status: "$status",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  // =========================
  // BUILD MONTHLY DATA
  // =========================

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = Array.from(
    { length: 12 },
    (_, index) => ({
      month: months[index],
      created: 0,
      completed: 0,
      overdue: 0,
      projects: 0,
    })
  );

  monthlyStats.forEach((item) => {
    const monthIndex = Number(item._id.month) - 1;
    const status = item._id.status;
    const count = Number(item.count || 0);

    if (monthIndex < 0 || monthIndex > 11) {
      return;
    }

    monthlyData[monthIndex].created += count;

    if (status === "completed") {
      monthlyData[monthIndex].completed += count;
    }

    if (status === "overdue") {
      monthlyData[monthIndex].overdue += count;
    }
  });

  // =========================
  // CUMULATIVE PROJECT LINE
  // =========================

  let cumulativeProjects = 0;

  monthlyData.forEach((month) => {
    cumulativeProjects += month.created;
    month.projects = cumulativeProjects;
  });

  // =========================
  // RETURN DASHBOARD DATA
  // =========================

  return {
    stats: {
      totalProjects: stats.totalProjects,
      activeProjects: stats.activeProjects,
      completedProjects: stats.completedProjects,
      overdueProjects: stats.overdueProjects,
    },

    statusChart,

    progress,

    chartData: monthlyData,

    availableYears: years,

    selectedYear: year,

    recentProjects,

    recentActivity: activityStats,
  };
};

module.exports = {
  getDashboardSummary,
};