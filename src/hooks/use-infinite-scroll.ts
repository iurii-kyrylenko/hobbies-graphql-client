import { useCallback, useEffect, useState } from "react";

export const useInfiniteScroll = (search: string, delta = 24) => {
    const [limit, setLimit] = useState(delta);

    const filterCondition = useCallback(
        (_item: unknown, idx: number) => idx < limit,
        [limit]
    );

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY + 100 >= document.body.scrollHeight) {
                setLimit((limit) => limit + delta);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [limit]);

    useEffect(() => {
        window.scroll({ top: 0 });
        setLimit(delta);
    }, [search, delta]);

    return filterCondition;
};
