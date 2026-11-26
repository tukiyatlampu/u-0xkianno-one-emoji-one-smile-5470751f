# TEST_RESULTS.md — u-0xkianno-one-emoji-one-smile-5470751f

Verified 2026-11-27 00:2x WIB (Node v24.22.1, local VM). All runs real, zero errors.

## 1. Syntax check

- Command: `node --check main.ts`
- Result: PASS (no output, exit 0).

## 2. Determinism — 3 runs, byte-identical

- Run A: `MAKEFUN_OUTPUT_DIR=/tmp/smile-a node main.ts` → wrote `/tmp/smile-a/entry.txt` (4 bytes)
- Run B: `MAKEFUN_OUTPUT_DIR=/tmp/smile-b node main.ts` → wrote `/tmp/smile-b/entry.txt` (4 bytes)
- Run C (clean dir, only `main.ts` copied in): `MAKEFUN_OUTPUT_DIR=/tmp/smile-clean node main.ts` → wrote `/tmp/smile-clean/entry.txt` (4 bytes)
- sha256 (all three): `4dfbcab9041276596339508f642e6ad755f7981625e17b692a4e0c0c9bae4494`
- Bytes: `f0 9f a4 97` — exactly 1 character, code point U+1F917 🤗, valid UTF-8, not whitespace-only. Gate (1–8 characters) satisfied.

## 3. Kit check (from the extracted kit)

- Command: `node cli/makefun.mjs check --kit . --repo <package> --worktree`
- Kit verified: 8/8 manifest files match (tarball SHA differs from `bundle_sha256` in kit.json — gzip re-compression on download; contents verified identical, not a blocker).
- PASS (4): `competition_open`, `snapshot` (4 files, 5,225 bytes, within caps), `license_osi` (SPDX MIT), `entrypoint` (main.ts → node22, accepted).
- FAIL (1): `transcripts_present` — expected: transcripts are bundled by the parent agent at submit time, not by this build task.
- SKIP (14): strategy_note (not requested), committed_secret (no --dotenv), all transcript-gate checks (no session parsed yet).
- At submission (5, checked by the site): repo_public, repo_owner (`.makefun/owner.json` present, 58 bytes), repo_created_after_open, commit_in_repo, duplicate_snapshot — all handled at push/submit time by the parent agent.

## 4. Zero-fail QA (clean directory)

- Copied only `main.ts` to a fresh directory, ran it with a fresh output dir: exit 0, output byte-identical to runs A/B (same sha256 above). No dependencies, no network, no hardcoded paths beyond the documented `$MAKEFUN_OUTPUT_DIR` / `/output` default.
