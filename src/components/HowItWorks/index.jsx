import Card from "../Card/index.jsx";

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-around h-[100svh] bg-[#F7F7F7] text-black font-body [ flex-wrap: wrap;]">
      <h2 className="text-4xl text-center font-bold">How It Works?</h2>
        <div className="flex justify-between w-11/12 mt-10">
            <Card title="Create Profile" widthX="20" content="Start by signing up and setting up your profile. Add the skills you can teach and those you want to learn. Include details about your availability and preferred language to help others find you.
Tell us about your expertise and the skills you’re eager to gain. The more details, the better your match!" icon="src/assets/profile.svg" bgcolor={"blue"} bradius="full" padding="10"/>

            <Card title="Find Match" widthX="20" content="Use filters to search for people who complement your skills. Our smart matchmaking system will suggest the best partners based on your profile and preferences.

Browse through profiles, view skill compatibility, and connect with users who align with your learning goals." icon="src/assets/profile.svg" bgcolor={"blue"}/>

            <Card title="Exchange Skills" widthX="20" content="Start a conversation with your match, schedule sessions, and exchange knowledge. Both parties benefit by teaching and learning together in a barter-style interaction.

Learn what you love while helping someone else grow. Share resources, chat, and schedule sessions to succeed together!" icon="src/assets/profile.svg" bgcolor={"blue"}/>
        </div>
        <h2 className="text-4xl font-semibold leading-relaxed">Ready to start your skill exchange journey? <div className="text-center">
            Create your profile <button className="bg-blue px-3 rounded-md font-bold text-white" >Now!</button>
        </div></h2>
    </div>
  )
}
export default HowItWorks;