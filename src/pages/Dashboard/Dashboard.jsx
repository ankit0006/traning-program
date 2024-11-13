import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation to detect current path
import { useIdleTimer } from 'react-idle-timer'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, LineElement, BarElement, ArcElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const location = useLocation(); // Get current route location
  
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // Idle timer setup
  const logout = () => {
    localStorage.removeItem('authtoken'); 
    localStorage.removeItem('firstName');
    setIsAuthenticated(false); 
    navigate('/signin'); 
};

const { reset } = useIdleTimer({
    timeout: 60000, 
    onIdle: logout, 
    debounce: 500,
});


const handleUserActivity = () => {
  reset();
};

useEffect(() => {
  document.addEventListener('mousemove', handleUserActivity);
  document.addEventListener('keypress', handleUserActivity);
  return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
  };
}, [reset]);
  

  const Graphs = {
    months: ({ count }) => {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames.slice(0, count);
    },
  };

  const labels = Graphs.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1.5
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center', 
        labels: {
        boxWidth: 20, 
      }
      },
    },
    maintainAspectRatio: false,
  };

  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
      });
      const infoWindow = new window.google.maps.InfoWindow();

      const locationButton = document.createElement("button");
      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);

      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map);
            }
          );
        } else {
          handleLocationError(false, infoWindow, map);
        }
      });
    };
    window.initMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLocationError = (browserHasGeolocation, infoWindow, map) => {
    const pos = map.getCenter();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  const pieCharts = [
    {
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'Dataset 1',
          data: [300, 50, 100],
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 205, 86, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
          borderWidth: 1
        }]
      }
    },
    {
      data: {
        labels: ['Green', 'Orange', 'Purple'],
        datasets: [{
          label: 'Dataset 2',
          data: [150, 100, 100],
          backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(153, 102, 255, 0.5)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
          borderWidth: 1
        }]
      }
    },
    {
      data: {
        labels: ['Pink', 'Brown', 'Gray'],
        datasets: [{
          label: 'Dataset 3',
          data: [200, 150, 50],
          backgroundColor: ['rgba(255, 105, 180, 0.5)', 'rgba(139, 69, 19, 0.5)', 'rgba(128, 128, 128, 0.5)'],
          borderColor: ['rgba(255, 105, 180, 1)', 'rgba(139, 69, 19, 1)', 'rgba(128, 128, 128, 1)'],
          borderWidth: 1
        }]
      }
    },
    {
      data: {
        labels: ['Cyan', 'Magenta', 'Yellow'],
        datasets: [{
          label: 'Dataset 4',
          data: [120, 180, 300],
          backgroundColor: ['rgba(0, 255, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(255, 205, 86, 0.5)'],
          borderColor: ['rgba(0, 255, 255, 1)', 'rgba(255, 0, 255, 1)', 'rgba(255, 205, 86, 1)'],
          borderWidth: 1
        }]
      }
    }
  ];

  return (
    <div class="grid grid-cols-4 grid-rows-2 w-full h-[calc(100vh-80px)] bg-white">
        <div class="col-start-1 col-end-3 p-5 pb-3 border border-gray-300 m-1 rounded-md">
          <h3 class='text-2xl font-semibold'>Performance Graph</h3>
          <Bar data={data} options={options} />
        </div>

        <div ref={mapRef} class=" col-start-3 col-end-5  border border-gray-300 p-5 rounded-md m-1 "></div>
        
        <div class="flex justify-around col-span-4 p-2 border border-gray-300 m-1 rounded-md">
          {pieCharts.map((chart, index) => (
            <div key={index} class='w-1/6'>
              <Pie data={chart.data} options={pieOptions} />
            </div>
          ))}
        </div>
        </div>
  );
};

export default Dashboard;
