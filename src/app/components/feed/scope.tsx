const Scope = () => {
    return (
        <ul className="divide-x-2 divide-slate-400 flex items-center h-30 border-2 m-2 rounded border-slate-400 text-slate-400 text-sm">
            <li className="py-2 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -8 24 24" width="18" fill="currentColor"><path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z"></path></svg>
            </li>
            <li className="py-2 px-6 m-0">
                Subscribed
            </li>
            <li className="py-2 px-6 m-0 bg-slate-400 text-slate-800">
                Local
            </li>
            <li className="py-2 px-6 m-0">
                All
            </li>
        </ul>
    )
}

export default Scope;