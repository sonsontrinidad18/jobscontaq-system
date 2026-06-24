import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function DashboardPage() {
  const { data: applicants } = await supabase
    .from("applicants")
    .select("*")
    .order("worker_name");

  const total      = applicants?.length || 0;
  const processing = applicants?.filter((a) => a.deployment_status === "Processing").length || 0;
  const forDeploy  = applicants?.filter((a) => a.deployment_status === "For Deployment").length || 0;
  const deployed   = applicants?.filter((a) => a.deployment_status === "Deployed").length || 0;
  const recent     = applicants?.slice(0, 5) || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .db-root { font-family:'Inter',sans-serif; background:#F7F5F0; min-height:100vh; padding:2.5rem 2.5rem 5rem; color:#0F1C2E; }
        .db-title { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:#0F1C2E; letter-spacing:-0.3px; margin:0 0 0.2rem; }
        .db-gold-rule { width:2rem;height:2px;background:#C9A84C;border:none;margin:0 0 0.4rem; }
        .db-subtitle { font-size:0.8125rem;color:#64748B;margin:0 0 2rem; }
        .db-stats { display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem; }
        @media(max-width:900px){.db-stats{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:480px){.db-stats{grid-template-columns:1fr;} .db-root{padding:1.25rem 1rem 5rem;} .db-title{font-size:1.5rem;}}
        .db-card { background:#fff;border-radius:4px;border:1px solid #E8E5DF;border-left:3px solid #C9A84C;padding:1.25rem 1.4rem;position:relative;overflow:hidden;transition:box-shadow .15s; }
        .db-card:hover{box-shadow:0 4px 16px rgba(15,28,46,0.07);}
        .db-card::after{content:'';position:absolute;top:0;right:0;width:48px;height:48px;background:linear-gradient(135deg,transparent 50%,rgba(201,168,76,0.05) 50%);pointer-events:none;}
        .db-card-label{font-size:0.625rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#94A3B8;margin:0 0 0.5rem;}
        .db-card-value{font-family:'Playfair Display',serif;font-size:2.25rem;font-weight:700;line-height:1;margin:0 0 0.3rem;}
        .db-card-sub{font-size:0.6875rem;color:#94A3B8;margin:0;}
        .c-dark{color:#0F1C2E;} .c-amber{color:#C8800A;} .c-blue{color:#2563EB;} .c-green{color:#1A7A35;}
        .db-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;}
        @media(max-width:768px){.db-grid{grid-template-columns:1fr;}}
        .db-section{background:#fff;border-radius:4px;border:1px solid #E8E5DF;padding:1.5rem 1.75rem;}
        .db-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;padding-bottom:0.85rem;border-bottom:1px solid #F1EFE9;}
        .db-section-left{display:flex;align-items:center;gap:0.65rem;}
        .db-section-icon{width:28px;height:28px;background:#F7F5F0;border:1px solid #E8E5DF;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;color:#C9A84C;}
        .db-section-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:600;color:#0F1C2E;margin:0;}
        .db-view-all{font-size:0.6875rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#C9A84C;text-decoration:none;transition:color .15s;}
        .db-view-all:hover{color:#0F1C2E;}
        .db-applicant-row{display:flex;align-items:center;justify-content:space-between;padding:0.7rem 0;border-bottom:1px solid #F7F5F0;gap:0.75rem;}
        .db-applicant-row:last-child{border-bottom:none;}
        .db-applicant-left{display:flex;align-items:center;gap:0.75rem;min-width:0;}
        .db-avatar{width:34px;height:34px;border-radius:50%;background:#D8EDD0;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:600;color:#2D6A2D;flex-shrink:0;}
        .db-applicant-name{font-size:0.8125rem;font-weight:600;color:#0F1C2E;margin:0 0 0.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;}
        .db-applicant-meta{font-size:0.6875rem;color:#94A3B8;margin:0;}
        .db-badge{display:inline-block;padding:0.18rem 0.55rem;border-radius:2px;font-size:0.5625rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;border:1px solid;white-space:nowrap;flex-shrink:0;}
        .b-proc{background:#FFFBEB;color:#92580A;border-color:#E8C56A;}
        .b-dep{background:#EFF6FF;color:#1D4ED8;border-color:#93C5FD;}
        .b-done{background:#F0FDF4;color:#15803D;border-color:#86EFAC;}
        .db-breakdown-row{display:flex;align-items:center;justify-content:space-between;padding:0.65rem 0;border-bottom:1px solid #F7F5F0;}
        .db-breakdown-row:last-child{border-bottom:none;}
        .db-breakdown-label{font-size:0.8125rem;color:#334155;font-weight:500;}
        .db-breakdown-bar-wrap{flex:1;margin:0 1rem;height:4px;background:#EEF0EC;border-radius:2px;overflow:hidden;}
        .db-breakdown-bar{height:100%;border-radius:2px;transition:width .3s ease;}
        .db-breakdown-count{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#0F1C2E;min-width:24px;text-align:right;}
        .db-actions-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;}
        @media(max-width:480px){.db-actions-grid{grid-template-columns:1fr;}}
        .db-action-btn{display:flex;flex-direction:column;align-items:flex-start;padding:1rem 1.1rem;border-radius:3px;text-decoration:none;border:1px solid #E8E5DF;background:#FAFAF8;transition:border-color .15s,background .15s;}
        .db-action-btn:hover{border-color:#C9A84C;background:#FDFAF3;}
        .db-action-icon{font-size:1.1rem;color:#C9A84C;margin-bottom:0.5rem;}
        .db-action-label{font-size:0.75rem;font-weight:600;color:#0F1C2E;margin:0 0 0.15rem;}
        .db-action-sub{font-size:0.6375rem;color:#94A3B8;margin:0;}
        .db-empty{text-align:center;padding:2rem;color:#94A3B8;font-size:0.8125rem;}
      `}</style>

      <main className="db-root">
        <h1 className="db-title">Dashboard</h1>
        <hr className="db-gold-rule" />
        <p className="db-subtitle">JobsContaq Applicant & Worker Management System</p>

        {/* Stats */}
        <div className="db-stats">
          <div className="db-card">
            <p className="db-card-label">Total Applicants</p>
            <p className="db-card-value c-dark">{total}</p>
            <p className="db-card-sub">All records</p>
          </div>
          <div className="db-card">
            <p className="db-card-label">Processing</p>
            <p className="db-card-value c-amber">{processing}</p>
            <p className="db-card-sub">Awaiting completion</p>
          </div>
          <div className="db-card">
            <p className="db-card-label">For Deployment</p>
            <p className="db-card-value c-blue">{forDeploy}</p>
            <p className="db-card-sub">Ready to deploy</p>
          </div>
          <div className="db-card">
            <p className="db-card-label">Deployed</p>
            <p className="db-card-value c-green">{deployed}</p>
            <p className="db-card-sub">Currently abroad</p>
          </div>
        </div>

        {/* Two-col */}
        <div className="db-grid">

          {/* Recent Applicants */}
          <div className="db-section">
            <div className="db-section-header">
              <div className="db-section-left">
                <div className="db-section-icon">◎</div>
                <h2 className="db-section-title">Recent Applicants</h2>
              </div>
              <Link href="/applicants" className="db-view-all">View All →</Link>
            </div>
            {recent.length > 0 ? recent.map((a) => {
              const parts = (a.worker_name||"").trim().split(/[\s,]+/).filter(Boolean);
              const initials = parts.length === 1 ? parts[0].slice(0,2).toUpperCase() : (parts[0][0]+parts[1][0]).toUpperCase();
              return (
                <Link key={a.id} href={`/applicants/${a.id}`} style={{textDecoration:"none",display:"block"}}>
                  <div className="db-applicant-row">
                    <div className="db-applicant-left">
                      <div className="db-avatar">{initials}</div>
                      <div style={{minWidth:0}}>
                        <p className="db-applicant-name">{a.worker_name}</p>
                        <p className="db-applicant-meta">{a.position} · {a.country}</p>
                      </div>
                    </div>
                    <span className={`db-badge ${a.deployment_status==="Deployed"?"b-done":a.deployment_status==="For Deployment"?"b-dep":"b-proc"}`}>
                      {a.deployment_status||"Processing"}
                    </span>
                  </div>
                </Link>
              );
            }) : <div className="db-empty">No applicants yet.</div>}
          </div>

          {/* Breakdown */}
          <div className="db-section">
            <div className="db-section-header">
              <div className="db-section-left">
                <div className="db-section-icon">◈</div>
                <h2 className="db-section-title">Status Breakdown</h2>
              </div>
            </div>
            {[
              {label:"Processing",     count:processing, color:"#C8800A"},
              {label:"For Deployment", count:forDeploy,  color:"#2563EB"},
              {label:"Deployed",       count:deployed,   color:"#1A7A35"},
            ].map((item) => (
              <div className="db-breakdown-row" key={item.label}>
                <span className="db-breakdown-label">{item.label}</span>
                <div className="db-breakdown-bar-wrap">
                  <div className="db-breakdown-bar" style={{width:total>0?`${Math.round((item.count/total)*100)}%`:"0%",background:item.color}} />
                </div>
                <span className="db-breakdown-count">{item.count}</span>
              </div>
            ))}
            <div style={{marginTop:"1.5rem",paddingTop:"1rem",borderTop:"1px solid #F1EFE9"}}>
              <p style={{fontSize:"0.625rem",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#94A3B8",margin:"0 0 0.75rem"}}>Deployment Rate</p>
              <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                <div style={{flex:1,height:"6px",background:"#EEF0EC",borderRadius:"3px",overflow:"hidden"}}>
                  <div style={{height:"100%",background:"linear-gradient(90deg,#1A7A35,#4CAF72)",borderRadius:"3px",width:total>0?`${Math.round((deployed/total)*100)}%`:"0%"}} />
                </div>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontWeight:700,color:"#1A7A35",flexShrink:0}}>
                  {total>0?Math.round((deployed/total)*100):0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="db-section">
          <div className="db-section-header">
            <div className="db-section-left">
              <div className="db-section-icon">✦</div>
              <h2 className="db-section-title">Quick Actions</h2>
            </div>
          </div>
          <div className="db-actions-grid">
            <Link href="/applicants/new" className="db-action-btn">
              <span className="db-action-icon">＋</span>
              <p className="db-action-label">New Applicant</p>
              <p className="db-action-sub">Register a new applicant record</p>
            </Link>
            <Link href="/applicants" className="db-action-btn">
              <span className="db-action-icon">◎</span>
              <p className="db-action-label">View All Applicants</p>
              <p className="db-action-sub">Browse and manage all records</p>
            </Link>
            <Link href="/applicants?status=Processing" className="db-action-btn">
              <span className="db-action-icon">◈</span>
              <p className="db-action-label">Processing Queue</p>
              <p className="db-action-sub">{processing} applicant{processing!==1?"s":""} pending</p>
            </Link>
            <Link href="/applicants?status=For Deployment" className="db-action-btn">
              <span className="db-action-icon">⟶</span>
              <p className="db-action-label">For Deployment</p>
              <p className="db-action-sub">{forDeploy} applicant{forDeploy!==1?"s":""} ready</p>
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}