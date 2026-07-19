"use client";

import { useState, type FormEvent } from "react";
import { prospect } from "@/config/prospect";
import type { Fixture, MatchResult, Player, Position, StaffMember } from "@/config/types";

export function PlayerForm({ onSave, initial }: { onSave: (player: Omit<Player,"id">) => void; initial?: Player }) {
  const [firstName,setFirstName]=useState(initial?.firstName??""); const [lastName,setLastName]=useState(initial?.lastName??""); const [number,setNumber]=useState(initial?.number??0); const [position,setPosition]=useState<Position>(initial?.position??"MF");
  const submit=(e:FormEvent)=>{e.preventDefault();onSave({teamId:initial?.teamId??prospect.defaultTeamId,firstName,lastName,number,position,hometown:"Tacoma, WA",yearJoined:2026,bio:"New sample player profile.",stats:{appearances:0,starts:0,minutes:0,goals:0,assists:0,yellowCards:0,redCards:0}})};
  return <form className="admin-form" onSubmit={submit}><div className="form-grid"><label>First name<input required value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Jordan"/></label><label>Last name<input required value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Lee"/></label><label>Squad number<input required min="1" max="99" type="number" value={number||""} onChange={(e)=>setNumber(Number(e.target.value))}/></label><label>Position<select value={position} onChange={(e)=>setPosition(e.target.value as Position)}><option>GK</option><option>DF</option><option>MF</option><option>FW</option></select></label></div><label className="file-field">Player photo<input type="file"/><span>Choose image</span><small>Photo uploads work on the live platform.</small></label><div className="form-actions"><button type="button" className="secondary">Cancel</button><button>Save player</button></div></form>;
}

export function StaffForm({ onSave }: { onSave: (staff: Omit<StaffMember,"id">) => void }) {
  const [name,setName]=useState(""); const [role,setRole]=useState("");
  return <form className="admin-form" onSubmit={(e)=>{e.preventDefault();onSave({name,role,teamId:prospect.defaultTeamId,bio:"Sample staff profile."})}}><label>Full name<input required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Taylor Morgan"/></label><label>Role<input required value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Assistant Coach"/></label><label className="file-field">Staff photo<input type="file"/><span>Choose image</span><small>Photo uploads work on the live platform.</small></label><div className="form-actions"><button>Save staff member</button></div></form>;
}

export function FixtureForm({ onSave }: { onSave: (fixture: Omit<Fixture,"id">) => void }) {
  const [opponent,setOpponent]=useState(""); const [date,setDate]=useState("2026-09-19T19:00"); const [venue,setVenue]=useState(prospect.club.venue??""); const [homeAway,setHomeAway]=useState<"home"|"away">("home");
  return <form className="admin-form" onSubmit={(e)=>{e.preventDefault();onSave({teamId:prospect.defaultTeamId,seasonId:prospect.currentSeasonId,opponent,date:new Date(date).toISOString(),venue,homeAway,competition:"Pacific Premier League",status:"upcoming"})}}><label>Opponent<input required value={opponent} onChange={(e)=>setOpponent(e.target.value)} placeholder="Sound City FC"/></label><div className="form-grid"><label>Kickoff<input required type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)}/></label><label>Home or away<select value={homeAway} onChange={(e)=>setHomeAway(e.target.value as "home"|"away")}><option value="home">Home</option><option value="away">Away</option></select></label></div><label>Venue<input required value={venue} onChange={(e)=>setVenue(e.target.value)}/></label><div className="form-actions"><button>Save fixture</button></div></form>;
}

export function ResultForm({ fixture, onSave }: { fixture: Fixture; onSave: (result: MatchResult) => void }) {
  const [clubScore,setClubScore]=useState(0); const [opponentScore,setOpponentScore]=useState(0);
  return <form className="admin-form" onSubmit={(e)=>{e.preventDefault();onSave({clubScore,opponentScore,scorers:clubScore?["Sample scorer 58'"]:[]})}}><div className="result-title"><strong>Meridian United</strong><span>vs</span><strong>{fixture.opponent}</strong></div><div className="score-inputs"><input aria-label="Meridian score" min="0" type="number" value={clubScore} onChange={(e)=>setClubScore(Number(e.target.value))}/><span>–</span><input aria-label="Opponent score" min="0" type="number" value={opponentScore} onChange={(e)=>setOpponentScore(Number(e.target.value))}/></div><div className="form-actions"><button>Record result</button></div></form>;
}
