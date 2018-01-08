'use strict';

module.exports = {
  'REG_CMD': 0x00, // USB Command
  'REG_STS': 0x02, // USB Status
  'REG_INTR': 0x04, // USB Interrupt Enable
  'REG_FRNUM': 0x06, // Frame Number
  'REG_FRBASEADD': 0x08, // Frame List Base Address
  'REG_SOFMOD': 0x0C, // Start of Frame Modify
  'REG_PORT1': 0x10, // Port 1 Status/Control
  'REG_PORT2': 0x12, // Port 2 Status/Control
  'REG_LEGSUP': 0xc0, // Legacy Support,
  'CMD_RS': (1 << 0), // Run/Stop
  'CMD_HCRESET': (1 << 1), // Host Controller Reset
  'CMD_GRESET': (1 << 2), // Global Reset
  'CMD_EGSM': (1 << 3), // Enter Global Suspend Resume
  'CMD_FGR': (1 << 4), // Force Global Resume
  'CMD_SWDBG': (1 << 5), // Software Debug
  'CMD_CF': (1 << 6), // Configure Flag
  'CMD_MAXP': (1 << 7) // Max Packet (0 = 32, 1 = 64)
};