module.exports = {
  default: {
    enabled: false,
    provider: "whisper", // Communication provider. Currently, Embark only supports whisper
    available_providers: ["whisper"], // Array of available providers
  },

  development: {
    connection: {
      host: "localhost", // Host of the blockchain node
      port: 8547, // Port of the blockchain node
      type: "ws" // Type of connection (ws or rpc)
    }
  },
};
