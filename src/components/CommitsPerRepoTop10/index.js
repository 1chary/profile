import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const COLORS = ['#54CA76', '#31A4E6', '#9261F3', '#F2637F', '#F5C452']

export default function CommitsPerRepoTop10(props) {
  const {repoCommitCountConvertedData} = props

  return (
    <ResponsiveContainer className="commitsPer10">
      <PieChart>
        <Pie
          data={repoCommitCountConvertedData}
          cx={200}
          cy={200}
          labelLine={false}
          innerRadius={70}
          outerRadius={150}
          fill="#8884d8"
          dataKey="commits"
        >
          {repoCommitCountConvertedData.map((entry, index) => (
            <Cell key="name" fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Legend className="legend" />
      </PieChart>
    </ResponsiveContainer>
  )
}
