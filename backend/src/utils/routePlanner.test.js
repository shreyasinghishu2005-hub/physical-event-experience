import test from "node:test";
import assert from "node:assert/strict";
import { shortestPath } from "./routePlanner.js";

test("shortestPath returns the shortest traversal when a route exists", () => {
  const graph = {
    Entrance: ["Hall A", "Lobby"],
    Lobby: ["Entrance", "Hall B"],
    "Hall A": ["Entrance", "Hall B"],
    "Hall B": ["Lobby", "Hall A"]
  };

  assert.deepEqual(shortestPath(graph, "Entrance", "Hall B"), ["Entrance", "Hall A", "Hall B"]);
});

test("shortestPath returns an empty array when the route does not exist", () => {
  const graph = {
    A: ["B"],
    B: ["A"],
    C: []
  };

  assert.deepEqual(shortestPath(graph, "A", "C"), []);
});
