import React from 'react'

const TemplateCard = ({template}) => {
  return (
    <div className='transition-all p-6 bg-[#191b2e] border border-[#2d2f40] text-slate-300 rounded-xl flex flex-col gap-5'>
        <div className="w-full flex flex-row justify-between"><span className='font-bold text-blue-500'>Role</span><span>{template?.role}</span></div>
        <div className="h-4 w-full mb-3 font-bold text-blue-500">Questions</div>
        <div className="">
            {template.questions.map((question) => (
                <div className="w-full mb-5 text-gray-400">{question}</div>
            ))}
        </div>
    </div>
  )
}

export default TemplateCard
