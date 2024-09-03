import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        // 빈 문자열이 입력되면 즉시 debounceValue를 빈 문자열로 설정
        if (value === '') {
            setDebounceValue('');
            return;
        }

        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay])

    return debounceValue;
}