
const MyModal = ({visible, onclose}) => {

    const handleOnclose = () => {
        onclose() 
    }

    if (!visible) return null;

    return ( 
        <div className="fixed inset-0 flex items-center justify-center bg-blue bg-opacity-30 backdrop-blur-sm"> 
            <div className="rounded bg-white px-10 py-8">
                <div className="grid gap-y-3 py-4 text-center">
                    <span className="text-3xl font-extrabold">Thank You For Your Payment!</span>
                    <span className="text-lg font-semibold">Please wait for us to verify your ticket.</span>
                </div>
                <div className="flex justify-between py-4">
                    <button onClick={handleOnclose} 
                        className="bg-blue-500 mr-4 rounded-lg px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true">
                        Close
                    </button>
                    <button 
                        className="bg-blue-500 mr-4 rounded-lg px-6 py-3 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true">
                        Check Ticket Status
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default MyModal;