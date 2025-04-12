import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Empty, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const History = () => {
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Vous devez être connecté pour accéder à cette page');
      navigate('/login');  // Redirect to login if not authenticated
      return;
    }

    fetchHistory(token);
  }, [navigate]);

  const fetchHistory = async (token) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/simulations/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          message.error('Session expirée, veuillez vous reconnecter');
          navigate('/login');
          return;
        }
        throw new Error('Erreur lors de la récupération de l\'historique');
      }

      const data = await response.json();
      setSimulations(data);
    } catch (error) {
      console.error('Error fetching history:', error);
      message.error('Erreur lors de la récupération de l\'historique');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => new Date(text).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Type de crédit',
      dataIndex: 'id_type_credit',
      key: 'id_type_credit',
      render: (typeId) => (
        <Tag color={typeId === 1 ? 'blue' : 'green'}>
          {typeId === 1 ? 'Immobilier' : 'Consommation'}
        </Tag>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: text => `${parseInt(text).toLocaleString()} MAD`,
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: months => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return years > 0 
          ? `${years} an${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` et ${remainingMonths} mois` : ''}`
          : `${months} mois`;
      },
    },
    {
      title: 'Taux',
      dataIndex: 'taux',
      key: 'taux',
      render: text => `${text}%`,
    },
    {
      title: 'Mensualité',
      dataIndex: 'mensualites',
      key: 'mensualites',
      render: text => `${parseFloat(text).toLocaleString()} MAD`,
    },
    {
      title: 'Total à rembourser',
      dataIndex: 'total_a_rembourser',
      key: 'total_a_rembourser',
      render: text => `${parseFloat(text).toLocaleString()} MAD`,
    },
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 140px)' }}>
      <Title level={2} style={{ marginBottom: '30px', textAlign: 'center' }}>
        Historique de vos simulations
      </Title>

      {simulations.length > 0 ? (
        <Table 
          dataSource={simulations} 
          columns={columns}
          loading={loading}
          rowKey="id_simulation"
          pagination={{ pageSize: 10 }}
          style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        />
      ) : !loading ? (
        <Empty 
          description="Vous n'avez pas encore effectué de simulation" 
          style={{ marginTop: '50px' }}
        />
      ) : null}
    </div>
  );
};

export default History;
