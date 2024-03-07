import CustomButton from "../../../components/CustomButton";

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
                    <CustomButton onClick={handleOnclose} 
                        content="close">
                        Close
                    </CustomButton>
                    <CustomButton type="filled" content="Check Ticket Status" >
                    </CustomButton>
                </div>
                
            </div>
        </div>
    )
}

export default MyModal;