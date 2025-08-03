import { useState } from "react";

export default function useToggle(initialValue: boolean = false): [boolean, (val: boolean) => void] {
    const [state, setState] = useState(initialValue)

    const toggle = () => {
        setState(prev => !prev)
    }

    return [state, toggle]
}
