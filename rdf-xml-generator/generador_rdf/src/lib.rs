use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use rand::seq::SliceRandom;  // For randomizing predicates and node selection
use rand::thread_rng;  // For random number generator to shuffle

// Define the structure for the graph configuration
#[derive(Serialize, Deserialize, Clone)]  // Derive Clone for Graph
pub struct GraphConfig {
    pub graph: Graph,
}

#[derive(Serialize, Deserialize, Clone)]  // Derive Clone for Graph
pub struct Graph {
    pub nodes: Vec<Node>,
    pub predicates: Vec<Predicate>,
    pub stats: Stats,
}

#[derive(Serialize, Deserialize, Clone)]  // Derive Clone for Node
pub struct Node {
    pub id: String,
    pub r#type: String, // 'type' is a reserved keyword in Rust, so we use r#type
    pub properties: Properties,
}

#[derive(Serialize, Deserialize, Clone)]  // Derive Clone for Properties
pub struct Properties {
    pub name: String,
    pub category: String,
}

#[derive(Serialize, Deserialize, Clone)]  // Derive Clone for Predicate
pub struct Predicate {
    pub id: String,
    pub label: String,
    pub description: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Stats {
    pub number_of_triples: usize,  // Only using this field now
}

// This function receives the updated JSON configuration and generates an RDF/XML
#[wasm_bindgen] 
pub fn generar_rdf(json_config: &str) -> String {
    // Parse the JSON input
    let config: GraphConfig = serde_json::from_str(json_config).unwrap();
    
    // Create the RDF/XML header
    let mut rdf_xml = r#"<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <rdf:Description rdf:about="http://example.org/graph">
            <rdfs:label>Graph</rdfs:label>
        </rdf:Description>"#.to_string();

    // Use the number of triples to control how many relationships we create
    let number_of_triples = config.graph.stats.number_of_triples;
    let nodes = &config.graph.nodes;
    let predicates = &config.graph.predicates;

    // Shuffle predicates to ensure randomness in the RDF triples
    let mut shuffled_predicates = predicates.clone(); // This creates a clone of the predicates
    let mut rng = thread_rng();  // Create a random number generator
    shuffled_predicates.shuffle(&mut rng);  // Shuffle the cloned predicates

    let mut triple_count = 0;

    // Generate RDF/XML for triples based on the number_of_triples
    while triple_count < number_of_triples {
        // Pick two random nodes
        let node1 = &nodes[triple_count % nodes.len()];
        let node2 = &nodes[(triple_count + 1) % nodes.len()];

        // Use the predicates cyclically
        let predicate = &shuffled_predicates[triple_count % shuffled_predicates.len()];

        rdf_xml.push_str(&format!(
            r#"
            <rdf:Description rdf:about="http://example.org/{node1_id}">
                <rdf:{predicate_label} rdf:resource="http://example.org/{node2_id}" />
            </rdf:Description>"#,
            node1_id = node1.id,
            predicate_label = predicate.label,
            node2_id = node2.id
        ));

        triple_count += 1;
    }

    // Closing RDF/XML tag
    rdf_xml.push_str("</rdf:RDF>");
    
    rdf_xml
}

#[wasm_bindgen]
pub fn obtener_mensaje() -> String {
    "Este es un mensaje de ejemplo.".to_string()
}
