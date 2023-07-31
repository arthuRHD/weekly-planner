interface SearchBarProps { text?: string }

export function ProductSearchBar({ text }: SearchBarProps) {
    return (<div>{text}</div>);
}