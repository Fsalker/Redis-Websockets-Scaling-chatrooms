const socketPorts = process.env.API_PORT_1
  ? [process.env.SOCKET_PORT_1, process.env.SOCKET_PORT_2]
  : [3050, 3051]

const socketHost = process.env.NAME ? "host.docker.internal" : "localhost"

export default {
  SOCKET_PORTS: socketPorts,
  SOCKET_HOST: socketHost
}