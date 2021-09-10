exports.sensors = [
    {
      id: '28-0517c1fe23ff', 
      label: 'Outside',
      type: 'ds18b20',
      thingspeak_field: 4
    }, 
    {
      id: '28-05179039bfff', 
      label: 'Lounge',
      type: 'ds18b20',
      thingspeak_field: 3
    },
    {
      type: 'bme280',
      label: 'Pressure',
      i2cAddress: 0x76,
      pressure: true,
      temperature: false,
      thingspeak_field: 5
    }
  ];