export const mockUsers = {
    drivers: [
      { id: 'DRV001', name: 'John Smith' },
      { id: 'DRV002', name: 'Mike Johnson' }
    ],
    assistants: [
      { id: 'AST001', name: 'David Wilson' },
      { id: 'AST002', name: 'James Brown' }
    ]
  };
  
  export const mockShipments = [
    // Driver shipments
    {
      id: 1,
      driverId: 'DRV001',
      date: '2024-10-26',
      startTime: "08:00:00",
      endTime: "10:30:00",
      routeId: 103,
      truckId: 'TRK-456',
      assistantId: 'AST001',
      status: "Active",
      remainingCapacity: 500
    },
    {
      id: 2,
      driverId: 'DRV001',
      date: '2024-10-26',
      startTime: "13:00:00",
      endTime: "15:30:00",
      routeId: 107,
      truckId: 'TRK-789',
      assistantId: 'AST002',
      status: "Upcoming",
      remainingCapacity: 1000
    },
    // Assistant shipments
    {
      id: 3,
      assistantId: 'AST001',
      date: '2024-10-26',
      startTime: "08:00:00",
      endTime: "10:30:00",
      routeId: 201,
      truckId: 'TRK-456',
      driverId: 'DRV001',
      status: "Active",
      remainingCapacity: 500
    },
    {
      id: 4,
      assistantId: 'AST001',
      date: '2024-10-26',
      startTime: "13:00:00",
      endTime: "15:30:00",
      routeId: 202,
      truckId: 'TRK-789',
      driverId: 'DRV002',
      status: "Upcoming",
      remainingCapacity: 1000
    }
  ];
  
  export const mockRoutes = {
    // Driver routes
    103: {
      id: 103,
      name: "Route 103 - Colombo North",
      mainTowns: "Kotahena, Grandpass, Mattakkuliya"
    },
    107: {
      id: 107,
      name: "Route 107 - Colombo South",
      mainTowns: "Wellawatte, Bambalapitiya, Kollupitiya"
    },
    // Assistant routes
    201: {
      id: 201,
      name: "Route 201 - Kandy Central",
      mainTowns: "Peradeniya, Katugastota, Kundasale"
    },
    202: {
      id: 202,
      name: "Route 202 - Kandy South",
      mainTowns: "Ampitiya, Digana, Teldeniya"
    }
  };
  
  export const mockOrders = {
    // Driver orders
    1: [
      {
        orderId: "ORD-001",
        customerId: 1,
        customerName: "John's Grocery",
        deliveryAddress: "123 Main St, Kotahena",
        status: "Pending",
        expectedTime: "08:30:00",
        totalCapacity: 200
      },
      {
        orderId: "ORD-002",
        customerId: 2,
        customerName: "Quick Mart",
        deliveryAddress: "456 Church Rd, Grandpass",
        status: "Pending",
        expectedTime: "09:15:00",
        totalCapacity: 300
      }
    ],
    2: [
      {
        orderId: "ORD-003",
        customerId: 3,
        customerName: "Colombo Central Store",
        deliveryAddress: "789 Station Rd, Mattakkuliya",
        status: "Pending",
        expectedTime: "13:30:00",
        totalCapacity: 400
      }
    ],
    // Assistant orders
    3: [
      {
        orderId: "ORD-004",
        customerId: 4,
        customerName: "Kandy Supermarket",
        deliveryAddress: "45 Temple St, Peradeniya",
        status: "Pending",
        expectedTime: "08:30:00",
        totalCapacity: 300
      },
      {
        orderId: "ORD-005",
        customerId: 5,
        customerName: "City Mart Kandy",
        deliveryAddress: "78 Hill St, Katugastota",
        status: "Pending",
        expectedTime: "09:30:00",
        totalCapacity: 250
      }
    ],
    4: [
      {
        orderId: "ORD-006",
        customerId: 6,
        customerName: "Fresh Foods Kandy",
        deliveryAddress: "90 Lake Rd, Ampitiya",
        status: "Pending",
        expectedTime: "13:30:00",
        totalCapacity: 350
      }
    ]
  };