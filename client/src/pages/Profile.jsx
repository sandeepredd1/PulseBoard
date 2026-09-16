import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Mail,
  User,
  Pencil,
  Save,
  X,
  ShieldCheck,
  LockKeyhole,
  BriefcaseBusiness,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const fileRef = useRef(null);

  const [image, setImage] = useState(
    user?.profileImage || null
  );
  const [imageFile, setImageFile] = useState(null);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Project Manager",
    className:
      user?.className || "PulseBoard Workspace",
  });

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "Project Manager",
      className:
        user?.className || "PulseBoard Workspace",
    });

    setImage(user?.profileImage || null);
    setImageFile(null);
  }, [user]);

  const initials =
    form.name
      ?.trim()
      .split(/\s+/)
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PB";

  /* =========================================
     IMAGE SELECT
  ========================================== */

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    setSaved(false);
  };

  /* =========================================
     FORM CHANGE
  ========================================== */

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setSaved(false);
  };

  /* =========================================
     SAVE PROFILE
  ========================================== */

  const saveProfile = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("role", form.role);
      formData.append("className", form.className);

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      if (updateProfile) {
        await updateProfile(formData);
      } else {
        console.error(
          "updateProfile function is missing in AuthContext"
        );
      }

      setEditing(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     CANCEL EDIT
  ========================================== */

  const cancelEdit = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "Project Manager",
      className:
        user?.className || "PulseBoard Workspace",
    });

    setImage(user?.profileImage || null);
    setImageFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    setEditing(false);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl pb-8">
        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p
              className="
                mb-1
                text-xs
                font-semibold
                uppercase
                tracking-widest

                text-violet-600

                dark:text-violet-400
              "
            >
              Account
            </p>

            <h1
              className="
                text-2xl
                font-bold

                text-slate-900

                dark:text-white

                sm:text-3xl
              "
            >
              My Profile
            </h1>

            <p
              className="
                mt-1
                text-sm

                text-slate-500

                dark:text-slate-400
              "
            >
              Manage your profile information and account
              settings.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="
                flex
                items-center
                gap-2
                rounded-xl

                bg-violet-600

                px-4
                py-2.5

                text-sm
                font-semibold
                text-white

                shadow-lg
                shadow-violet-500/20

                transition

                hover:-translate-y-0.5
                hover:bg-violet-700
                hover:shadow-xl

                active:scale-95
              "
            >
              <Pencil size={15} />
              Edit Profile
            </button>
          )}
        </div>

        {/* =========================================
            SUCCESS MESSAGE
        ========================================== */}

        {saved && (
          <div
            className="
              mb-5
              flex
              items-center
              gap-2
              rounded-xl

              border
              border-emerald-200

              bg-emerald-50

              px-4
              py-3

              text-sm
              font-medium
              text-emerald-700

              dark:border-emerald-500/20
              dark:bg-emerald-500/10
              dark:text-emerald-400
            "
          >
            <CheckCircle2 size={17} />
            Profile information saved successfully.
          </div>
        )}

        {/* =========================================
            PROFILE HERO
        ========================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-3xl

            border
            border-slate-200

            bg-white

            p-6

            shadow-sm

            transition

            hover:shadow-lg

            dark:border-slate-700/60
            dark:bg-slate-900/70
            dark:shadow-black/20
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full

              bg-violet-200/40

              blur-3xl

              dark:bg-violet-500/10
            "
          />

          <div
            className="
              absolute
              -bottom-24
              left-1/3
              h-48
              w-48
              rounded-full

              bg-cyan-200/30

              blur-3xl

              dark:bg-cyan-500/10
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-5

              sm:flex-row
              sm:items-center
            "
          >
            {/* =====================================
                PROFILE PHOTO
            ====================================== */}

            <div className="group relative shrink-0">
              <div
                className="
                  relative
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full

                  border-4
                  border-white

                  bg-gradient-to-br
                  from-violet-500
                  via-blue-500
                  to-cyan-400

                  text-2xl
                  font-bold
                  text-white

                  shadow-lg

                  dark:border-slate-800
                "
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  initials
                )}

                {/* Hover Camera */}
                <button
                  type="button"
                  onClick={() =>
                    fileRef.current?.click()
                  }
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center

                    bg-black/50
                    text-white

                    opacity-0

                    transition

                    group-hover:opacity-100
                  "
                  aria-label="Change profile image"
                >
                  <Camera size={22} />
                </button>
              </div>

              {/* Camera Button */}
              <button
                type="button"
                onClick={() =>
                  fileRef.current?.click()
                }
                className="
                  absolute
                  bottom-0
                  right-0

                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full

                  border-2
                  border-white

                  bg-violet-600

                  text-white

                  shadow-lg

                  transition

                  hover:scale-110
                  hover:bg-violet-700

                  dark:border-slate-900
                "
                aria-label="Change profile image"
              >
                <Camera size={14} />
              </button>

              {/* File Input */}
              <input
                ref={fileRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImage}
                className="hidden"
              />
            </div>

            {/* =====================================
                USER INFO
            ====================================== */}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  className="
                    truncate
                    text-xl
                    font-bold

                    text-slate-900

                    dark:text-white

                    sm:text-2xl
                  "
                >
                  {form.name || "PulseBoard User"}
                </h2>

                <span
                  className="
                    rounded-full

                    bg-violet-100

                    px-2.5
                    py-1

                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide

                    text-violet-600

                    dark:bg-violet-500/10
                    dark:text-violet-400
                  "
                >
                  {form.role}
                </span>
              </div>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2

                  text-sm

                  text-slate-500

                  dark:text-slate-400
                "
              >
                <Mail size={15} />

                <span className="truncate">
                  {form.email}
                </span>
              </div>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap

                  text-xs

                  text-slate-500

                  dark:text-slate-400
                "
              >
                <BriefcaseBusiness size={14} />

                <span>Class:</span>

                <span
                  className="
                    font-semibold

                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  {form.className}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            CONTENT
        ========================================== */}

        <div
          className="
            mt-5
            grid
            gap-5

            lg:grid-cols-[1fr_320px]
          "
        >
          {/* =======================================
              PERSONAL INFORMATION
          ======================================== */}

          <section
            className="
              rounded-3xl

              border
              border-slate-200

              bg-white

              shadow-sm

              dark:border-slate-700/60
              dark:bg-slate-900/70
            "
          >
            <div
              className="
                border-b
                border-slate-200

                p-5

                dark:border-slate-700
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl

                    bg-violet-100
                    text-violet-600

                    dark:bg-violet-500/10
                    dark:text-violet-400
                  "
                >
                  <User size={18} />
                </div>

                <div>
                  <h2
                    className="
                      text-base
                      font-bold

                      text-slate-900

                      dark:text-white
                    "
                  >
                    Personal Information
                  </h2>

                  <p
                    className="
                      text-xs

                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    Update your profile details.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editing}
                  icon={<User size={15} />}
                />

                <Input
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editing}
                  icon={<Mail size={15} />}
                />

                <Input
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={!editing}
                  icon={<BriefcaseBusiness size={15} />}
                />

                <Input
                  label="Class / Workspace"
                  name="className"
                  value={form.className}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              {/* Save Buttons */}
              {editing && (
                <div
                  className="
                    mt-5
                    flex
                    justify-end
                    gap-3

                    border-t
                    border-slate-200

                    pt-5

                    dark:border-slate-700
                  "
                >
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={saving}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl

                      border
                      border-slate-200

                      bg-white

                      px-4
                      py-2.5

                      text-sm
                      font-semibold
                      text-slate-600

                      transition

                      hover:bg-slate-50
                      hover:shadow-sm

                      disabled:cursor-not-allowed
                      disabled:opacity-50

                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-300
                      dark:hover:bg-slate-700
                    "
                  >
                    <X size={15} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveProfile}
                    disabled={saving}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl

                      bg-violet-600

                      px-4
                      py-2.5

                      text-sm
                      font-semibold
                      text-white

                      shadow-lg
                      shadow-violet-500/20

                      transition

                      hover:-translate-y-0.5
                      hover:bg-violet-700
                      hover:shadow-xl

                      active:scale-95

                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <Save size={15} />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* =======================================
              RIGHT SIDE
          ======================================== */}

          <div className="space-y-5">
            {/* Account Status */}
            <section
              className="
                rounded-3xl

                border
                border-slate-200

                bg-white

                p-5

                shadow-sm

                dark:border-slate-700/60
                dark:bg-slate-900/70
              "
            >
              <CardTitle
                icon={<ShieldCheck size={18} />}
                title="Account Status"
                text="Your account is active"
                color="green"
              />

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  rounded-xl

                  bg-emerald-50

                  px-4
                  py-3

                  dark:bg-emerald-500/10
                "
              >
                <span
                  className="
                    text-sm
                    font-semibold

                    text-slate-700

                    dark:text-slate-200
                  "
                >
                  Status
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-2

                    text-xs
                    font-bold

                    text-emerald-600

                    dark:text-emerald-400
                  "
                >
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full

                      bg-emerald-500
                    "
                  />

                  Active
                </span>
              </div>
            </section>

            {/* Security */}
            <section
              className="
                rounded-3xl

                border
                border-slate-200

                bg-white

                p-5

                shadow-sm

                dark:border-slate-700/60
                dark:bg-slate-900/70
              "
            >
              <CardTitle
                icon={<LockKeyhole size={18} />}
                title="Password & Security"
                text="Keep your account secure"
                color="blue"
              />

              <button
                type="button"
                onClick={() => setPasswordOpen(true)}
                className="
                  group
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl

                  border
                  border-slate-200

                  bg-slate-50

                  px-4
                  py-3

                  transition

                  hover:border-violet-200
                  hover:bg-violet-50
                  hover:shadow-md

                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:hover:border-violet-500/30
                  dark:hover:bg-violet-500/10
                "
              >
                <span
                  className="
                    text-sm
                    font-semibold

                    text-slate-700

                    dark:text-slate-300
                  "
                >
                  Change Password
                </span>

                <ChevronRight
                  size={16}
                  className="
                    text-slate-400

                    transition

                    group-hover:translate-x-1
                    group-hover:text-violet-500

                    dark:text-slate-500
                    dark:group-hover:text-violet-400
                  "
                />
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* =========================================
          PASSWORD MODAL
      ========================================== */}

      {passwordOpen && (
        <PasswordModal
          close={() => setPasswordOpen(false)}
        />
      )}
    </Layout>
  );
}

/* =========================================================
   INPUT COMPONENT
========================================================= */

function Input({
  label,
  name,
  value,
  onChange,
  disabled,
  icon,
}) {
  return (
    <div>
      <label
        className="
          mb-2
          block

          text-xs
          font-semibold

          text-slate-700

          dark:text-slate-300
        "
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2

              text-slate-400

              dark:text-slate-500
            "
          >
            {icon}
          </span>
        )}

        <input
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            h-11
            w-full
            rounded-xl

            border
            border-slate-200

            bg-white

            pr-4

            text-sm
            text-slate-800

            outline-none

            transition

            focus:border-violet-400
            focus:ring-4
            focus:ring-violet-500/10

            disabled:cursor-not-allowed
            disabled:bg-slate-50
            disabled:text-slate-500

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white

            dark:focus:border-violet-500

            dark:disabled:bg-slate-800/60
            dark:disabled:text-slate-500

            ${
              icon
                ? "pl-10"
                : "pl-4"
            }
          `}
        />
      </div>
    </div>
  );
}

/* =========================================================
   CARD TITLE
========================================================= */

function CardTitle({
  icon,
  title,
  text,
  color,
}) {
  const colors = {
    green:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

    blue:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl

          ${colors[color]}
        `}
      >
        {icon}
      </div>

      <div>
        <h3
          className="
            text-sm
            font-bold

            text-slate-900

            dark:text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            text-xs

            text-slate-500

            dark:text-slate-400
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   PASSWORD MODAL
========================================================= */

function PasswordModal({ close }) {
  const [form, setForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      onClick={close}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center

        bg-slate-950/40

        p-4

        backdrop-blur-sm

        dark:bg-black/70
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md
          rounded-3xl

          border
          border-slate-200

          bg-white

          shadow-2xl

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/40
        "
      >
        {/* Modal Header */}
        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-slate-200

            p-5

            dark:border-slate-700
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-bold

                text-slate-900

                dark:text-white
              "
            >
              Change Password
            </h2>

            <p
              className="
                mt-1
                text-xs

                text-slate-500

                dark:text-slate-400
              "
            >
              Update your account password.
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="
              rounded-lg
              p-2

              text-slate-400

              transition

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Close password modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 p-5">
          {[
            ["current", "Current Password"],
            ["newPassword", "New Password"],
            ["confirm", "Confirm New Password"],
          ].map(([name, label]) => (
            <div key={name}>
              <label
                className="
                  mb-2
                  block

                  text-xs
                  font-semibold

                  text-slate-700

                  dark:text-slate-300
                "
              >
                {label}
              </label>

              <div className="relative">
                <LockKeyhole
                  size={15}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2

                    text-slate-400

                    dark:text-slate-500
                  "
                />

                <input
                  type="password"
                  name={name}
                  value={form[name]}
                  onChange={change}
                  placeholder={label}
                  className="
                    h-11
                    w-full
                    rounded-xl

                    border
                    border-slate-200

                    bg-white

                    pl-10
                    pr-4

                    text-sm
                    text-slate-800

                    outline-none

                    transition

                    placeholder:text-slate-400

                    focus:border-violet-400
                    focus:ring-4
                    focus:ring-violet-500/10

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-white
                    dark:placeholder:text-slate-500

                    dark:focus:border-violet-500
                  "
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={close}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl

              bg-violet-600

              px-4
              py-3

              text-sm
              font-semibold
              text-white

              shadow-lg
              shadow-violet-500/20

              transition

              hover:bg-violet-700
              hover:shadow-xl

              active:scale-[0.98]
            "
          >
            <Save size={15} />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}