import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Empty, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './History.css';

const { Title } = Typography;

const History = () => {
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Vous devez être connecté pour accéder à cette page');
      navigate('/login');
      return;
    }

    fetchHistory(token);
  }, [navigate]);

  const fetchHistory = async (token) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/simulations', {
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
      setSimulations(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      message.error('Erreur lors de la récupération de l\'historique');
      setSimulations([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => new Date(text).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
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
      sorter: (a, b) => a.montant - b.montant,
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
      sorter: (a, b) => a.duree - b.duree,
    },
    {
      title: 'Taux',
      dataIndex: 'taux',
      key: 'taux',
      render: text => `${text}%`,
      sorter: (a, b) => a.taux - b.taux,
    },
    {
      title: 'Mensualité',
      dataIndex: 'mensualites',
      key: 'mensualites',
      render: text => `${parseFloat(text).toLocaleString()} MAD`,
      sorter: (a, b) => a.mensualites - b.mensualites,
    },
    {
      title: 'Total à rembourser',
      dataIndex: 'total_a_rembourser',
      key: 'total_a_rembourser',
      render: text => `${parseFloat(text).toLocaleString()} MAD`,
      sorter: (a, b) => a.total_a_rembourser - b.total_a_rembourser,
    },
  ];

  return (
    <div className="history-container">
      <Title level={2} className="history-title">
        Historique de vos simulations
      </Title>

      <div className="table-card">
        {simulations.length > 0 ? (
          <Table 
            dataSource={simulations} 
            columns={columns}
            loading={loading}
            rowKey="id_simulation"
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total: ${total} simulations`
            }}
            scroll={{ x: 'max-content' }}
          />
        ) : !loading ? (
          <Empty 
            description="Aucune simulation trouvée" 
            style={{ marginTop: '50px' }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default History;
