import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRJSULB9S0ax_0hgLC6X1RXlCLAz5_oZPE3b1uGPtwChtutzdnPOmVFdaYKmP2VmiZfr0Rs6IzxxVzC/pub?gid=0&single=true&output=csv';

function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Simple CSV parsing - handles basic cases
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    // Expected structure: Date,Morning,Notes,Midday,Notes,Evening,Notes,Extra hours
    if (values.length >= 7 && values[0]) {
      const row = {
        Date: values[0],
        Morning: values[1] || '',
        'Morning Notes': values[2] || '',
        Midday: values[3] || '',
        'Midday Notes': values[4] || '',
        Evening: values[5] || '',
        'Evening Notes': values[6] || '',
        'Extra Hours': values[7] || ''
      };
      data.push(row);
    }
  }

  return data;
}

function processTrackerData(csvData) {
  const processed = csvData.map(row => {
    // Parse date from yyyy/MM/dd format
    const dateParts = row.Date.split('/');
    const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    
    return {
      date,
      dateString: row.Date,
      formattedDate: format(date, 'PPP'),
      shortDate: format(date, 'MMM d'),
      morning: {
        status: row['Morning'] || 'None',
        notes: row['Morning Notes'] || ''
      },
      midday: {
        status: row['Midday'] || 'None',
        notes: row['Midday Notes'] || ''
      },
      evening: {
        status: row['Evening'] || 'None',
        notes: row['Evening Notes'] || ''
      },
      extraHours: row['Extra Hours'] || ''
    };
  });

  // Sort by date (newest first)
  processed.sort((a, b) => b.date - a.date);

  // Group by month
  const grouped = {};
  processed.forEach(entry => {
    const monthKey = format(entry.date, 'yyyy-MM');
    const monthLabel = format(entry.date, 'MMMM yyyy');
    
    if (!grouped[monthKey]) {
      grouped[monthKey] = {
        monthLabel,
        entries: []
      };
    }
    
    grouped[monthKey].entries.push(entry);
  });

  // Convert to array and sort months (newest first)
  const groupedArray = Object.entries(grouped).map(([key, value]) => ({
    monthKey: key,
    ...value
  }));
  
  groupedArray.sort((a, b) => b.monthKey.localeCompare(a.monthKey));

  return groupedArray;
}

export default function useDailyTracker() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Add cache-busting timestamp to URL
      const cacheBustingUrl = `${CSV_URL}&t=${Date.now()}`;
      const response = await fetch(cacheBustingUrl, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      const csvData = parseCSV(csvText);
      const processedData = processTrackerData(csvData);
      
      setData(processedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}