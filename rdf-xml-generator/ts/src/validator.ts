// src/index.ts

export function validateGraph(json: any): string[] {
  const errors: string[] = [];
  
  // Validate that the 'graph' object exists
  if (!json || !json.graph) {
    errors.push("Graph object is missing.");
    return errors;
  }
  
  const graph = json.graph;
  
  // Validate nodes
  if (!Array.isArray(graph.nodes)) {
    errors.push("Graph 'nodes' should be an array.");
  } else {
    for (const [index, node] of graph.nodes.entries()) {
    if (typeof node.id !== 'string') {
      errors.push(`Node ${index} is missing a valid 'id' (expected string).`);
    }
    if (typeof node.type !== 'string') {
      errors.push(`Node ${index} is missing a valid 'type' (expected string).`);
    }
    if (typeof node.properties !== 'object') {
      errors.push(`Node ${index} is missing valid 'properties' (expected object).`);
    } else {
      const properties = node.properties;
      if (typeof properties.name !== 'string') {
      errors.push(`Node ${index} 'properties.name' is missing or is not a string.`);
      }
      if (typeof properties.category !== 'string') {
      errors.push(`Node ${index} 'properties.category' is missing or is not a string.`);
      }
    }
    }
  }
  
  // Validate predicates
  if (!Array.isArray(graph.predicates)) {
    errors.push("Graph 'predicates' should be an array.");
  } else {
    for (const [index, predicate] of graph.predicates.entries()) {
    if (typeof predicate.id !== 'string') {
      errors.push(`Predicate ${index} is missing a valid 'id' (expected string).`);
    }
    if (typeof predicate.label !== 'string') {
      errors.push(`Predicate ${index} is missing a valid 'label' (expected string).`);
    }
    if (typeof predicate.description !== 'string') {
      errors.push(`Predicate ${index} is missing a valid 'description' (expected string).`);
    }
    }
  }
  
  // Validate stats
  if (typeof graph.stats !== 'object') {
    errors.push("Graph 'stats' should be an object.");
  } else {
    if (typeof graph.stats.number_of_triples !== 'number') {
    errors.push("Graph 'stats.number_of_triples' should be a number.");
    }
  }
  
  return errors;
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
  const validationResult = validateGraph(jsonExample);
  if (validationResult.length === 0) {
  console.log("Validation successful!");
  } else {
  console.log("Validation failed with the following errors:");
  console.log(validationResult);
  }
  