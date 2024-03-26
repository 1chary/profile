import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

export default function LanguagesPerRepo(props) {
  const {languagePerRepoConvertedData} = props

  return (
    <PieChart width={500} height={400}>
      <Pie
        data={languagePerRepoConvertedData}
        cx={200}
        cy={200}
        labelLine={false}
        innerRadius={80}
        outerRadius={140}
        fill="#8884d8"
        dataKey="commits"
      >
        {languagePerRepoConvertedData.map((entry, index) => (
          <Cell key="name" fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend align="center" layout="horizontal" verticalAlign="bottom" />
    </PieChart>
  )
}
