import { timeStamp } from "console"

export const Bubbles = () => {

    const arrayBubbles = Array.from(Array(10).keys()).sort((a, b) => 0.5 - Math.random()).map(
        (number) => {
//             return (
// <div className="text-white  m-2">
//     {number}
// </div>
//             )
            return<div key={new Date().getTime()} className={` bg-bubble animate-[bubble_${number}s_ease-in-out_infinite] bottom-0 right-0 w-[4rem] bg-no-repeat bg-[length:15px_15px] '-webkit-animation':[ scrollUp 1s infinite linear]`}></div>
        }
    )

    return (
        <section className="fixed top-0 left-0 z-50 flex justify-evenly h-screen w-screen">
            {arrayBubbles}
        </section>

    )
}