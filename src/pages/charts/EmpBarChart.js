import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const EmpBarChart = ({data}) => {
    if (data?.length === 0) {
        return (
            <div className='no-records'>
                No Records
            </div>
        )
    } else {
        return (
            <div>
                <h2>Art Completion</h2>
                <ResponsiveContainer width="100%" height={400}>

                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completedArts" fill={'rgb(157, 191, 202)'} barSize={20} />
                        <Bar dataKey="totalArts" fill={'rgb(192, 166, 168)'} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
};

export default EmpBarChart;
