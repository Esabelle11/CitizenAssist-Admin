import { ColumnConfig, FormFieldConfig } from "@/components/crud/types";
import { AdminUser } from "@/types";
import { formatDate } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

/**
 * Columns
 */
export function getUserColumns(
  t: ReturnType<typeof useI18n>["t"]
): ColumnConfig<AdminUser>[] {
  const d = t.users;

  return [
    {
      accessorKey: "full_name",
      header: d.fullName,
    },
    {
      accessorKey: "email",
      header: d.email,
    },
    {
      accessorKey: "role",
      header: d.role,
    },
    {
      accessorKey: "last_login",
      header: d.lastLogin,
      render(value) {
        return value ? formatDate(value) : "-";
      },
    },
    {
      accessorKey: "created_at",
      header: d.joinedDate,
      render(value) {
        return value ? formatDate(value) : "-";
      },
    },
  ];
}

/**
 * Form Fields
 */
export function getUserFields(
  t: ReturnType<typeof useI18n>["t"]
): FormFieldConfig[] {
  const d = t.users;

  return [
    {
      name: "full_name",
      label: d.fullName,
      type: "text",
      dataType: "text",
      required: true,
    },

    {
      name: "email",
      label: d.email,
      type: "text",
      dataType: "email",
      required: true,
    },

    {
      name: "password",
      label: (mode) =>
        mode === "edit"
          ? d.newPassword
          : d.password,
      type: "password",
      dataType: "password",
      required: true,
      hideInEdit: false,
      hideInView: true,
    },

    {
      name: "department",
      label: d.department,
      type: "text",
      dataType: "text",
    },

    {
      name: "employee_id",
      label: d.employeeId,
      type: "text",
      dataType: "text",
    },

    {
      name: "phone",
      label: d.phone,
      type: "text",
      dataType: "text",
    },

    {
      name: "role_id",
      label: d.role,
      type: "select",
      dataType: "number",
      options: [],
    },
  ];
}

export function transformUserSubmit(data: any) {
  return {
    ...data,
  };
}