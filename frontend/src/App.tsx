import { useState } from 'react';

interface Room {
  id: number;
  roomName: string;
  totalBeds: number;
  occupiedBeds: number;
  currentMeterReading: number;
}

function App() {
  // 1. Room Data State
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, roomName: 'Room 1', totalBeds: 12, occupiedBeds: 8, currentMeterReading: 1240.5 },
    { id: 2, roomName: 'Room 2', totalBeds: 12, occupiedBeds: 12, currentMeterReading: 1450.2 },
    { id: 3, roomName: 'Room 3', totalBeds: 12, occupiedBeds: 0, currentMeterReading: 980.0 },
    { id: 4, roomName: 'Room 4', totalBeds: 12, occupiedBeds: 5, currentMeterReading: 1120.4 },
    { id: 5, roomName: 'Room 5', totalBeds: 12, occupiedBeds: 2, currentMeterReading: 1050.8 },
  ]);

  // 2. Form Input States
  const [tenantName, setTenantName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [hasIron, setHasIron] = useState(false);
  const [hasRiceCooker, setHasRiceCooker] = useState(false);

  // 3. Action function when you click "Register Tenant"
  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName.trim()) return alert('Please enter a tenant name!');

    const chosenRoom = rooms.find(r => r.id === selectedRoomId);
    if (chosenRoom && chosenRoom.occupiedBeds >= chosenRoom.totalBeds) {
      return alert('This room is fully booked! Choose another room.');
    }

    // Increment the occupied beds count for that room
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === selectedRoomId 
          ? { ...room, occupiedBeds: room.occupiedBeds + 1 } 
          : room
      )
    );

    let initialPayment = 7000;
    let details = 'Includes 1 Month Advance + 1 Month Deposit (₱7,000)';
    if (hasIron) details += ' + Iron addon';
    if (hasRiceCooker) details += ' + Rice Cooker addon';

    alert(`🎉 Successfully Registered ${tenantName} to Room ${selectedRoomId}!\nInitial Payment Required: ₱${initialPayment}\nDetails: ${details}`);
    
    // Clear the form fields
    setTenantName('');
    setHasIron(false);
    setHasRiceCooker(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      
      {/* Fixed Header Section */}
      <header style={{ marginBottom: '35px', paddingBottom: '15px', borderBottom: '2px solid #e5e7eb' }}>
        <h1 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '32px', fontWeight: 'bold' }}>
          Boarding House Management System
        </h1>
        <p style={{ color: '#4b5563', margin: 0, fontSize: '16px' }}>
          Overview of Rooms, Bed Space Capacities, and Sub-meters
        </p>
      </header>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Column: Room Grid Dashboard */}
        <div>
          <h2 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '15px' }}>Rooms Dashboard</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {rooms.map((room) => {
              const availableBeds = room.totalBeds - room.occupiedBeds;
              return (
                <div key={room.id} style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '6px solid #3b82f6' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#111827' }}>{room.roomName}</h3>
                  <div style={{ marginBottom: '8px', fontSize: '15px' }}>
                    <strong>Beds Occupied:</strong> {room.occupiedBeds} / {room.totalBeds}
                    <span style={{ marginLeft: '10px', color: availableBeds === 0 ? '#dc2626' : '#16a34a', fontWeight: 'bold' }}>
                      {availableBeds === 0 ? '(Full)' : `(${availableBeds} vacant)`}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', color: '#4b5563' }}>
                    <strong>Meter Reading:</strong> <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{room.currentMeterReading} kWh</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: New Tenant Registration Form */}
        <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', color: '#1f2937', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
            📝 Move-In New Tenant
          </h2>
          
          <form onSubmit={handleAddTenant}>
            {/* Input Name */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4b5563' }}>Tenant Name:</label>
              <input 
                type="text" 
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                placeholder="Juan Dela Cruz"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}
              />
            </div>

            {/* Select Room Option */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#4b5563' }}>Assign Room:</label>
              <select 
                value={selectedRoomId} 
                onChange={(e) => setSelectedRoomId(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#fff' }}
              >
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.roomName} ({r.totalBeds - r.occupiedBeds} spaces left)</option>
                ))}
              </select>
            </div>

            {/* Appliance Addons */}
            <div style={{ marginBottom: '20px', backgroundColor: '#f9fafb', padding: '15px', borderRadius: '6px', border: '1px solid #f3f4f6' }}>
              <span style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#4b5563' }}>Additional Appliances:</span>
              
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={hasIron} onChange={(e) => setHasIron(e.target.checked)} style={{ marginRight: '10px' }} />
                Electric Iron for clothes
              </label>

              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={hasRiceCooker} onChange={(e) => setHasRiceCooker(e.target.checked)} style={{ marginRight: '10px' }} />
                Rice Cooker
              </label>
            </div>

            {/* Note about Advance/Deposit */}
            <div style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
              ℹ️ System auto-applies <strong>1-Month Advance + 1-Month Deposit (₱7,000)</strong> on registration.
            </div>

            {/* Submit Button */}
            <button type="submit" style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
              Register Tenant & Process Billing
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default App;