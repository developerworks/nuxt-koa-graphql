module.exports = {
        webpack: (config, options, webpack) => {
        // Perform customizations to config
        // Important: return the modified config
        config.entry.main = "./src/server/index.js";
        return config;
    }
}