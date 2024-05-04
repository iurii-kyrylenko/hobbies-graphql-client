import { useMemo } from "react";

const useSearch = <T>(items: T[] | undefined, fields: (keyof T)[], search: string) =>
    useMemo(
        () => (items ?? []).filter((item) => {
            const regexp = new RegExp(search, "i");
            return fields.some((field) => regexp.test(item[field] as string));
        }),
        [items, fields, search]
    );

export { useSearch };
