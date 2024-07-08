import React, {useMemo} from 'react';
import {PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell} from 'recharts';

// Function to group data by title
const groupDataByTitle = (data) => {
    const groupedData = {};
    data.forEach(item => {
        if (groupedData[item.title]) {
            groupedData[item.title]++;
        } else {
            groupedData[item.title] = 1;
        }
    });
    return Object.keys(groupedData).map(title => ({
        title: title,
        count: groupedData[title]
    }));
};

// Function to generate pastel colors
const generatePastelColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const r = Math.floor((Math.random() * 127) + 128); // 128-255
        const g = Math.floor((Math.random() * 127) + 128); // 128-255
        const b = Math.floor((Math.random() * 127) + 128); // 128-255
        colors.push(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    }
    return colors;
};

const ArtsPieChart = ({data}) => {
    const chartData = groupDataByTitle(data);
    const colors = useMemo(() => generatePastelColors(chartData.length), [chartData.length]);
    if (data?.length === 0) {
        return (
            <div className='no-records'>
                No Records
            </div>
        )
    } else {
        return (
            <div>
                <h2>Art Creation</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="title"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
};

export default ArtsPieChart;
