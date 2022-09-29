import { useContext } from 'react';

export default function UserPanel({ guilds }){
    return (<h1>test AAA</h1>)
}


export async function getServerSideProps({ pageProps, context }){
    const guilds = 1
    // const guilds = context.ctx.guilds
    return {props: { guilds }}
}
