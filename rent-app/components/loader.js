export default function LoaderPage({ children }){
    return(
        <div className="grid place-items-center h-screen">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            <div className="spinner-grow relative w-10 h-10 bg-current rounded-full opacity-0" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>            
        </div>
    )
}