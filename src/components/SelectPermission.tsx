import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllPermissions } from "@/lib/api-call";
import zod from "zod";

const optionSchema = zod.object({
  value: zod.string(),
  label: zod.string(),
  id: zod.string(),
  module: zod.string(),
});

type TPermission = zod.infer<typeof optionSchema>;

const SelectPermission = ({ ...field }) => {
  const [groupedOptions, setGroupedOptions] = useState<{ label: string; options: TPermission[] }[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const { data, error, validationErrors } = await getAllPermissions();

      if (validationErrors?.length) {
        console.error(validationErrors);

        return;
      }

      if (error) {
        console.error(error);

        return;
      }

      if (data) {
        const groupedData: { [key: string]: TPermission[] } = {};

        data.forEach((permission) => {
          if (!groupedData[permission.module]) {
            groupedData[permission.module] = [];
          }

          groupedData[permission.module].push({
            value: permission.id,
            label: permission.action + " - " + permission.code,
            id: permission.id,
            module: permission.module,
          });
        });

        const groupedOptionsData = Object.keys(groupedData).map((module) => ({
          label: module,
          options: groupedData[module],
        }));

        setGroupedOptions(groupedOptionsData);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <Select
      {...field}
      defaultValue={[]}
      isMulti
      name="permissions"
      options={groupedOptions as never}
      isSearchable
      className=""
      classNamePrefix="permissions"
    />
  );
};

export default SelectPermission;
