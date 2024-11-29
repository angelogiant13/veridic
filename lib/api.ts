import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
});

export const fetchStats = async () => {
    try {
        const response = await api.get('/stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

export const fetchRecentAnalyses = async () => {
    try {
        const response = await api.get('/recent-analyses');
        return response.data;
    } catch (error) {
        console.error('Error fetching recent analyses:', error);
        throw error;
    }
};

export const fetchNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};
