export const Loading = () => {

    return (
        <section className="z-50 flex h-14 justify-evenly">
            <div className={` bg-bubble  animate-[displayNone_1s_infinite] animation-delay-100 top-0 bottom-0 right-0 left-0 h-full w-[4rem] bg-[50%] bg-no-repeat bg-[length:15px_15px]`}></div>
            <div className={` bg-bubble  animate-[displayNone_1s_infinite] animation-delay-200 top-0 bottom-0 right-0 left-0 h-full w-[4rem] bg-[50%] bg-no-repeat bg-[length:15px_15px]`}></div>
            <div className={` bg-bubble  animate-[displayNone_1s_infinite] animation-delay-300 top-0 bottom-0 right-0 left-0 h-full w-[4rem] bg-[50%] bg-no-repeat bg-[length:15px_15px]`}></div>
        </section>

    )
}