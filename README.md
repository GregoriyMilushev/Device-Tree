<h1>Device Tree</h1>

<h3>Overview</h3>
This project is a client-server solution that presents a live tree of the devices connected via USB to the server's machine. The device tree updates automatically according to device connection/disconnection. The tree is defined in such a way that a USB hub is a branch, and a device is a leaf. The presented information for each device/hub includes vendor and product IDs, type (hub or device), and string descriptor, if available.

This project is built using Node.js, React.js, and websockets.

<h3>Installation</h3>

<i>Install dependencies for the sever:</i><br>
<b>cd device-tree-server</b><br>
<b>npm install</b>

<i>Install dependencies for the client:</i><br>
<b>cd ../device-tree-ui</b><br>
<b>npm install</b>

<h3>Usage</h3>

<i>Start the server:</i><br>
<b>cd device-tree-server</b><br>
<b>npx nodemon</b><br>
or<br>
npm run build && npm run start<br>

This will start the server.

<i>Start the client:</i><br>
<b>cd ../device-tree-ui</b><br>
<b>npm run dev</b>

This will start the client and open it in your default browser at http://localhost:5173/.

Connect USB devices to the server machine to see the live device tree.

<h3>Features</h3>
<h4>Device tree</h4>
The device tree is a hierarchical representation of all the USB devices connected to the server machine. It is updated automatically when a device is connected or disconnected.

The tree is defined in such a way that a USB hub is a branch, and a device is a leaf. Each node in the tree represents either a hub or a device.

The information presented for each device/hub includes vendor and product IDs, type (hub or device), and string descriptor, if available.

<h4>Websockets</h4>
Websockets are used to handle the client-server communication. When a device is connected or disconnected, the server sends an update to all connected clients, which updates the device tree in real-time.
