cd generador_rdf
cargo clean
cargo build --release
./generate_wasm.sh
cd ..
cd ts
npx tsc
cd ..
docker compose up --build
