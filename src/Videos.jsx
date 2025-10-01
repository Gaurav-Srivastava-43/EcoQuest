import React, { useState, useEffect } from 'react';
import{

}from "lucide-react";
const Videos = ({videosPage}) => {
    const VideoCard = ({topicBucket,title,level,duration,source,isWatched,vlink}) => (
        <div className={`p-4 ${
        level === "Primary"? 'bg-pink-300' :
        level === "Secondary"? 'bg-blue-300' : 'bg-green-300'
        } rounded-lg flex flex-col justify-center items-center`}>
        {/* font color changes according to level must be implemented */}
        <h4 className='text-xl text-pink-600 font-semibold mb-4'>
            {topicBucket}
        </h4>
        <video width="300" controls>
            <source src={vlink} type='video/mp4'></source>
            Does not support... 
        </video>

        <h4 className='text-sm text-left font-bold mb-2'>
            {title}
        </h4>
        <p className='text-xs text-left mb-2'>
            Duration : {duration}<br></br>
            Source : {source}<br></br>
        </p>
        </div>
    );

    const primaryVideos = [
        {
            title : "Water Scarcity - A Short Story",
            topicBucket : "Preserving Water",
            level : "Primary",
            duration : "1 min 51 sec",
            source : "EcoQuest",
            isWatched : false,
            vlink : "Water_Scarcity_Video.mp4"
        }
    ];

    return(
        <>
        <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-pink-50 rounded-xl shadow-md p-6'>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    For Primary Level Students
                </h3>
                <div className='bg-pink-200 rounded-xl shadow-md p-4'>
                    <VideoCard
                    key={primaryVideos[0].title}
                    topicBucket={primaryVideos[0].topicBucket}
                    title={primaryVideos[0].title}
                    level={primaryVideos[0].level}
                    duration={primaryVideos[0].duration}
                    source={primaryVideos[0].source}
                    isWatched={primaryVideos[0].isWatched}
                    vlink={primaryVideos[0].vlink}
                    />
                    <h4 className='text-sm text-pink-600 font-semibold mt-6 mb-4'>
                        Others coming soon...
                    </h4>
                </div>
            </div>
            <div className='bg-blue-50 rounded-xl shadow-md p-6'>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    For Secondary Level Students
                </h3>
                <div className='bg-blue-200 rounded-xl shadow-md p-4'>
                    {/* <VideoCard
                    key={secondaryVideos[0].title}
                    topicBucket={secondaryVideos[0].topicBucket}
                    title={secondaryVideos[0].title}
                    level={secondaryVideos[0].level}
                    duration={secondaryVideos[0].duration}
                    source={secondaryVideos[0].source}
                    isWatched={secondaryVideos[0].isWatched}
                    vlink={secondaryVideos[0].vlink}
                    /> */}
                    <h4 className='text-sm text-blue-600 font-semibold mt-6 mb-4'>
                        Coming soon...
                    </h4>
                </div>
            </div>
            <div className='bg-green-50 rounded-xl shadow-md p-6'>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    For Senior Level Students
                </h3>
                <div className='bg-green-200 rounded-xl shadow-md p-4'>
                    {/* <VideoCard
                    key={seniorVideos[0].title}
                    topicBucket={seniorVideos[0].topicBucket}
                    title={seniorVideos[0].title}
                    level={seniorVideos[0].level}
                    duration={seniorVideos[0].duration}
                    source={seniorVideos[0].source}
                    isWatched={seniorVideos[0].isWatched}
                    vlink={seniorVideos[0].vlink}
                    /> */}
                    <h4 className='text-sm text-green-600 font-semibold mt-6 mb-4'>
                        Coming soon...
                    </h4>
                </div>
            </div>
        </div>
        
        </>

    );
};
export default React.memo(Videos);
