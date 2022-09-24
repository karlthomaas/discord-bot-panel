import '../styles/globals.css'
import App from 'next/app'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  // Check's if bot guilds have been loaded already
  if (appContext.ctx["guilds"] == undefined){
    
    // Fetches bot guilds
    const guildsFetch = await fetch(process.env.DISCORD_API_BASE_URL + `/users/@me/guilds`, {
      method: "get",
      headers: { Authorization: `Bot ${process.env.TOKEN}`}})
    
    // Saves bto guilds into context
    appContext.ctx["guilds"] = await guildsFetch.json()

  }

  console.log(appContext.ctx)
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
}


export default MyApp
