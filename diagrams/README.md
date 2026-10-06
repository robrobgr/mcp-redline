# Architecture Diagrams — mcp-redline

A collection of technical diagrams and architectural visualizations illustrating the deterministic verification mechanism and data boundary of `mcp-redline`.

---

## Diagram 1: Verification Flow (`verify`)

Illustrates the end-to-end evaluation pipeline from an input business claim to a deterministic `GROUNDED`, `CONTRADICTED`, or `UNSUPPORTED` verdict, explicitly showing that the verification engine **contains no language model**.

* **English:** [Mermaid source](01_verify_flow.en.mermaid) · [Vector SVG](01_verify_flow.en.svg)
* **Polski:** [Źródło Mermaid](01_verify_flow.pl.mermaid) · [Wektorowy SVG](01_verify_flow.pl.svg)

![Diagram 1: verify Flow](01_verify_flow.en.svg)

---

## Diagram 2: Data Boundary

Shows what remains on the workstation (the corpus files, the server) and what is transmitted: the server opens no network ports and makes no outbound calls. When using a cloud model, the MCP client transmits the claim and the quotes returned by the server to the model provider — the full corpus is not transmitted. For zero egress, use a local model (Ollama, LM Studio).

* **English:** [Mermaid source](02_ciso_data_boundary.en.mermaid) · [Vector SVG](02_ciso_data_boundary.en.svg)
* **Polski:** [Źródło Mermaid](02_ciso_data_boundary.pl.mermaid) · [Wektorowy SVG](02_ciso_data_boundary.pl.svg)

![Diagram 2: Data Boundary](02_ciso_data_boundary.en.svg)
