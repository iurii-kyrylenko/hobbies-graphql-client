import { useMemo } from "react";

type Items = { [key: string]: string }[] | undefined;

const useSearch = (items: Items, fields: string[], search: string) =>
    useMemo(
        () => (items ?? []).filter((item) => {
            const regexp = new RegExp(search, "i");
            return fields.some((field) => regexp.test(item[field]));
        }),
        [items, fields, search]
    );

export { useSearch };
