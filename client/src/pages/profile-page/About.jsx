/* eslint-disable react/prop-types */
const About = ({profile}) => {
  return (
    <div className="p-4 bg-[#191b2e] text-slate-100 rounded-xl">
      <p className="font-medium text-xl">About</p>
      <div className="p-2 rounded-xl bg-[#2d2f40] mt-4">
        <p className="break-all">
          {profile?.about || "I am a software developer and I love to code"}
        </p>
      </div>
    </div>
  );
};

export default About;
