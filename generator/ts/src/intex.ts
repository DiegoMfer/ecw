// src/index.ts

function validateGraphJSON(json: any): boolean {
    // Validate that the 'graph' object exists
    if (!json || !json.graph) {
      return false;
    }
  
    const graph = json.graph;
  
    // Validate nodes
    if (!Array.isArray(graph.nodes)) {
      return false;
    }
    for (const node of graph.nodes) {
      if (typeof node.id !== 'string' || typeof node.type !== 'string' || typeof node.properties !== 'object') {
        return false;
      }
      const properties = node.properties;
      if (typeof properties.name !== 'string' || typeof properties.category !== 'string') {
        return false;
      }
    }
  
    // Validate predicates
    if (!Array.isArray(graph.predicates)) {
      return false;
    }
    for (const predicate of graph.predicates) {
      if (typeof predicate.id !== 'string' || typeof predicate.label !== 'string' || typeof predicate.description !== 'string') {
        return false;
      }
    }
  
    // Validate stats
    if (typeof graph.stats !== 'object' || typeof graph.stats.number_of_triples !== 'number') {
      return false;
    }
  
    return true;
  }
  
  // Example usage:
  const jsonExample = {
    "graph": {
      "nodes": [
        {
          "id": "n1",
          "type": "Entity",
          "properties": {
            "name": "Node A",
            "category": "Type 1"
          }
        },
        {
          "id": "n2",
          "type": "Entity",
          "properties": {
            "name": "Node B",
            "category": "Type 2"
          }
        },
        {
          "id": "n3",
          "type": "Entity",
          "properties": {
            "name": "Node C",
            "category": "Type 3"
          }
        },
        {
          "id": "n4",
          "type": "Entity",
          "properties": {
            "name": "Node D",
            "category": "Type 1"
          }
        }
      ],
      "predicates": [
        {
          "id": "p1",
          "label": "connected_to",
          "description": "Represents a general connection between nodes"
        },
        {
          "id": "p2",
          "label": "related_to",
          "description": "Represents a general relationship between nodes"
        },
        {
          "id": "p3",
          "label": "belongs_to",
          "description": "Represents a membership relationship"
        }
      ],
      "stats": {
        "number_of_triples": 6
      }
    }
  };
  
  // Test the validation function
  console.log(validateGraphJSON(jsonExample));  // Output: true
  