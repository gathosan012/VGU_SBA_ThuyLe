module.exports = {
    apps: [
        {
            name: 'pit-front-end',
            port: 3000,
            script: './dist --spa', // --------------- our node start script here like index.js
            // ------------------------------------ watch options - begin
            watch: ['../'],
            watch_delay: 1000,
            ignore_watch: ['node_modules'],
            watch_options: {
                followSymlinks: false,
            },
            // ------------------------------------ watch options - end
        },
    ]
};