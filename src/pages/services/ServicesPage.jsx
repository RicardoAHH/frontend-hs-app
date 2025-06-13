import React from 'react';
import ServiceActionMenu from '../../components/ServiceActionMenu';
import { useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ReportServiceForm from './ReportServiceForm';
import ServiceList from './ServiceList';
import ServiceEvidenceViewer from './ServiceEvidenceViewer';
import ServiceApprovalPanel from './ServiceApprovalPanel';
import GlobalNav from '../../components/GlobalNav';

export default function ServicesPage({ profileData }) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const profile = state?.profile ?? profileData;

    if (!profileData) { return <p className="p-6">Cargando…</p>; }

    const role = profileData.role.name;

    // Handlers para navegar a cada subruta
    const handleReport = () => navigate('report');
    const handleList = () => navigate('list');
    const handleEvidence = () => navigate('evidence/${id}');
    const handleApproval = () => navigate('approval');
    return (
        <>
        <GlobalNav/>
        <div className="flex flex-col item-center justify-center aling md:flex-row md:items-start gap-4 flex-1 min-h-screen p-6 bg-cover bg-center" style={{
                backgroundImage: "url('/fondo.jpg')"
            }}>
            {/* Menú de acciones (panel izq) */}

            <ServiceActionMenu
                role={role}
                onReport={() => handleReport()}
                onList={() => handleList()}
                onEvidence={() => handleEvidence( /* id */ 1)}
                onApproval={() => handleApproval()}
            />

            {/* verificacion de rol */}
            {/* <div className="flex-1 bg-white rounded p-4 shadow">
                <h1 className="text-2xl font-bold mb-4">Servicios</h1>
                <p>
                    Rol del usuario: <strong>{role}</strong>
                </p>
            </div> */}
            {/* Panel de contenido con rutas anidadas */}
            <div className="flex-1 bg-white p-4 rounded shadow  flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Servicios</h1>
                <Routes>
                    {/* Redirige al listado por defecto */}
                    <Route index element={<Navigate to="list" replace />} />

                    {/* Ruta para reportar horas */}
                    <Route path="report" element={<ReportServiceForm />} />

                    {/* Ruta para listar horas */}
                    <Route path="list" element={<ServiceList role={role} />} />

                    {/* Ruta para ver evidencias de un servicio */}
                    <Route path="evidence/:id" element={<ServiceEvidenceViewer />} />

                    {/* Ruta de aprobación (solo Admin) protegida con comprobacion de rol*/}
                    <Route path="approval" element={ role === 'Admin'? <ServiceApprovalPanel /> : <Navigate to="list" replace /> } />
                </Routes>
            </div>
        </div>
        </>
    );
}