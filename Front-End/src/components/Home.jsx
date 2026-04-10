import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Vendas',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Vendas',
      },
    },
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <div style={{
        width: '250px',
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h2>Painel</h2>

        <Link to="/cadastro">
          <button style={{ width: '100%' }}>CADASTRO</button>
        </Link>

        <Link to="/cadastrar-produto">
          <button style={{ width: '100%' }}>CADASTRO PRODUTOS</button>
        </Link>

        <Link to="/listar-produtos">
          <button style={{ width: '100%' }}>LISTAR PRODUTOS</button>
        </Link>

         <Link to="/login">
          <button style={{ width: '100%' }}>SAIR</button>
        </Link>
      </div>

      <div style={{
        flex: 1,
        padding: '40px'
      }}>
        <Line data={data} options={options} height={200} width={500} />
      </div>

    </div>
  );
};

export default Home;
