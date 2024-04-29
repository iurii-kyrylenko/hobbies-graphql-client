import { useEffect, useState } from "react";

export const useInfiniteScroll = (delta = 24) => {
    const [limit, setLimit] = useState(delta);
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                setLimit((limit) => limit + delta);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [limit]);
    return limit;
};
