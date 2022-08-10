export default function LoaderPage({ children }){
    return(
        <div class="grid place-items-center h-screen">
            <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span class="visually-hidden">Loading...</span>
            <div class="spinner-grow relative w-10 h-10 bg-current rounded-full opacity-0" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>            
        </div>
    )
}