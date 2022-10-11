import Image from 'next/image'

export default function Loader(){
    return(
        <>
        <style jsx global>{`
        body {
            background: #5865F2;
        }`}</style>
        <div className="flex justify-center h-full w-full mt-24">
            <span className="loader"></span>
            {/* <Image src="/loader.svg" alt="loader" height={100} width={100}></Image> */}
        </div>
        </>
    )
}